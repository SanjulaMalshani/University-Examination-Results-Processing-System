package com.MiniProject.automate_results.dto.resluts;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserShortDetails {
    private String id;
    private String fullName;
}
