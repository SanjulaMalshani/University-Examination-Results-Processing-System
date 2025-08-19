package com.MiniProject.automate_results.entity.results;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StudentResult {
    private Integer no;
    private String index;
    private String gradeLec1;
    private String gradeLec2;
    private String grade;
    private Double mark;
    private Double markLec1;
    private Double markLec2;
}
